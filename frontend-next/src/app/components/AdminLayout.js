'use client'

import { useRouter } from 'next/navigation'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Toolbar } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LogoutIcon from '@mui/icons-material/Logout'

const drawerWidth = 256

export default function AdminLayout({ children }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push('/admin/login')
  }

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#111827', color: '#f3f4f6', p: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#60a5fa' }}>
          Painel Admin
        </Typography>
      </Toolbar>

      <List>
        <ListItemButton onClick={() => router.push('/admin/leads')}>
          <ListItemIcon>
            <PeopleAltIcon sx={{ color: '#60a5fa' }} />
          </ListItemIcon>
          <ListItemText primary="Leads" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#60a5fa' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // mobile: empilha, desktop: lado a lado
        minHeight: '100vh',
        bgcolor: '#0f172a',
        color: '#f3f4f6',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: '100%', md: drawerWidth },
          flexShrink: 0,
        }}
      >
        {drawer}
      </Box>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: '#0f172a',
          color: '#f3f4f6',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
