'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '../../../../components/AdminLayout'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material'

export default function EditLeadPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [lead, setLead] = useState({
    nome: '',
    email: '',
    phone: '',
    role: '',
    birthDate: '',
    message: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLead = async () => {
      const user = localStorage.getItem('adminUser')
      const pass = localStorage.getItem('adminPass')
      const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
          headers: { Authorization: authHeader },
        })

        if (!res.ok) throw new Error('Erro ao buscar lead')

        const data = await res.json()
        setLead({
          nome: data.nome || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || '',
          birthDate: data.birthDate || '',
          message: data.message || '',
        })
        setLoading(false)
      } catch (err) {
        router.push('/admin/login')
      }
    }

    if (id) fetchLead()
  }, [id, router])

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = localStorage.getItem('adminUser')
    const pass = localStorage.getItem('adminPass')
    const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(lead),
      })

      if (!res.ok) throw new Error('Erro ao atualizar lead')

      router.push('/admin/leads')
    } catch (err) {
      alert('Erro ao atualizar lead')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <Typography sx={{ color: '#f3f4f6' }}>Carregando...</Typography>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Paper sx={{ p: 4, bgcolor: '#111827', color: '#f3f4f6', maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Editar Lead
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={lead.nome}
            onChange={handleChange}
            fullWidth
            required
            sx={fieldStyle}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={lead.email}
            onChange={handleChange}
            fullWidth
            required
            sx={fieldStyle}
          />

          <TextField
            label="Telefone"
            name="phone"
            value={lead.phone}
            onChange={handleChange}
            fullWidth
            sx={fieldStyle}
          />

          <TextField
            label="Cargo"
            name="role"
            value={lead.role}
            onChange={handleChange}
            fullWidth
            sx={fieldStyle}
          />

          <TextField
            label="Data de Nascimento"
            name="birthDate"
            type="date"
            value={lead.birthDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={fieldStyle}
          />

          <TextField
            label="Mensagem"
            name="message"
            value={lead.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={fieldStyle}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#f3f4f6',
                borderColor: '#374151',
                '&:hover': { borderColor: '#60a5fa', bgcolor: '#1f2937' },
              }}
              onClick={() => router.push('/admin/leads')}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>
    </AdminLayout>
  )
}

const fieldStyle = {
  mb: 2,
  input: { color: '#f3f4f6' },
  label: { color: '#9ca3af' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#374151' },
    '&:hover fieldset': { borderColor: '#60a5fa' },
    '&.Mui-focused fieldset': { borderColor: '#60a5fa' },
  },
}
