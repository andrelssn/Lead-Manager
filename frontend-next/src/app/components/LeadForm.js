'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material'

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    birthDate: '',
    message: ''
  })
  const router = useRouter()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)

    const payload = {
      ...form,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content'),
      gclid: params.get('gclid'),
      fbclid: params.get('fbclid')
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    router.push('/thanks')
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: '#1f2937', // bg-gray-800
          color: '#f3f4f6' // text-gray-100
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: '#f3f4f6' }}
        >
          Cadastro de Lead
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827', // bg-gray-900
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' }, // border-gray-700
                  '&:hover fieldset': { borderColor: '#2563eb' }, // hover: blue-600
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' } // focus:ring-blue-500
                }
              }}
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                }
              }}
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
            />

            <TextField
              label="Telefone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                }
              }}
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
            />

            <TextField
              label="Cargo"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                }
              }}
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
            />

            <TextField
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true, sx: { color: '#9ca3af' } }}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                }
              }}
            />

            <TextField
              label="Mensagem"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: '#111827',
                  color: '#f3f4f6',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                }
              }}
              InputLabelProps={{ sx: { color: '#9ca3af' } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: '#2563eb', // bg-blue-600
                '&:hover': { bgcolor: '#1d4ed8' } // hover:bg-blue-700
              }}
            >
              Enviar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
