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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
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

      const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
          headers: { Authorization: authHeader },
        })

        if (!res.ok) throw new Error('Erro ao buscar leads')

        const data = await res.json()
        setLeads(data)
      } catch (err) {
        router.push('/admin/login')
      }
    }

    fetchLeads()
  }, [router])

  const handleDelete = async (id) => {
    if (!confirm('Deseja realmente excluir este lead?')) return

    const user = localStorage.getItem('adminUser')
    const pass = localStorage.getItem('adminPass')
    const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      })

      if (!res.ok) throw new Error('Erro ao excluir lead')

      // Atualiza lista local sem recarregar página
      setLeads((prev) => prev.filter((lead) => lead.id !== id))
    } catch (err) {
      alert('Erro ao excluir lead')
    }
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#f3f4f6' }}>
          Leads
        </Typography>
        <Link href="/">
          <Button
            startIcon={<AddIcon />}
            sx={{ bgcolor: '#2563eb', color: '#fff', '&:hover': { bgcolor: '#1d4ed8' } }}
          >
            Novo Lead
          </Button>
        </Link>
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

                <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Button size="small" sx={{ color: '#60a5fa' }} startIcon={<VisibilityIcon />}>
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/admin/leads/edit/${lead.id}`}>
                    <Button size="small" sx={{ color: '#34d399' }} startIcon={<EditIcon />}>
                      Editar
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    sx={{ color: '#f87171' }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(lead.id)}
                  >
                    Excluir
                  </Button>
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link href={`/admin/leads/${lead.id}`}>
                        <IconButton size="small" sx={{ color: '#60a5fa' }}>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                      <Link href={`/admin/leads/edit/${lead.id}`}>
                        <IconButton size="small" sx={{ color: '#34d399' }}>
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        size="small"
                        sx={{ color: '#f87171' }}
                        onClick={() => handleDelete(lead.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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
