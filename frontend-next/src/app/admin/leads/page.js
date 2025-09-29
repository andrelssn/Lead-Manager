'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../components/AdminLayout'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  useMediaQuery,
  Button,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTheme } from '@mui/material/styles'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchLeads = async () => {
      const user = localStorage.getItem('adminUser')
      const pass = localStorage.getItem('adminPass')

      if (!user || !pass) {
        router.push('/admin/login')
        return
      }

      const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
          headers: { Authorization: authHeader },
        })

        if (!res.ok) throw new Error('Erro ao buscar leads')

        const data = await res.json()
        setLeads(data)
      } catch (err) {
        console.error(err.message)
        router.push('/admin/login')
      }
    }

    fetchLeads()
  }, [router])

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#f3f4f6' }}>
          Leads
        </Typography>
      </Box>

      {isMobile ? (
        // MOBILE: cards
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {leads.map((lead) => (
            <Card key={lead.id} sx={{ bgcolor: '#111827', color: '#f3f4f6' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {lead.nome}
                </Typography>
                <Typography variant="body2">{lead.email}</Typography>
                <Box sx={{ mt: 1, textAlign: 'right' }}>
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Button
                      size="small"
                      sx={{ color: '#60a5fa', textTransform: 'none' }}
                      startIcon={<VisibilityIcon />}
                    >
                      Ver
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // DESKTOP: tabela
        <TableContainer
          component={Paper}
          sx={{ bgcolor: '#111827', borderRadius: 2, overflow: 'hidden' }}
        >
          <Table>
            <TableHead sx={{ bgcolor: '#1f2937' }}>
              <TableRow>
                <TableCell sx={{ color: '#f3f4f6', fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ color: '#f3f4f6', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#f3f4f6', fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow
                  key={lead.id}
                  sx={{
                    bgcolor: index % 2 === 0 ? '#0f172a' : '#1f2937',
                    '&:hover': { bgcolor: '#374151' },
                  }}
                >
                  <TableCell sx={{ color: '#f3f4f6' }}>{lead.nome}</TableCell>
                  <TableCell sx={{ color: '#f3f4f6' }}>{lead.email}</TableCell>
                  <TableCell>
                    <Link href={`/admin/leads/${lead.id}`}>
                      <IconButton size="small" sx={{ color: '#60a5fa' }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </AdminLayout>
  )
}
