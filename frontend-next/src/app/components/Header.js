'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Box,
	useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

export default function Header() {
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		const user = localStorage.getItem('adminUser')
		const pass = localStorage.getItem('adminPass')

		if (user && pass) {
			setIsLogged(true)
		} else {
			setIsLogged(false)
		}
	}, [])

	const pathname = usePathname()
	const links = [
		{ href: '/', label: 'Formulário Público' },
		{ href: !isLogged ? '/admin/login' : '/admin/leads', label: 'Painel Administrativo' },
	]

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [drawerOpen, setDrawerOpen] = useState(false)
	const toggleDrawer = () => setDrawerOpen(!drawerOpen)

	const drawerContent = (
		<Box sx={{ width: 250, bgcolor: '#111827', height: '100%', color: '#f3f4f6' }} onClick={toggleDrawer}>
			<List>
				{links.map((link) => (
					<ListItemButton key={link.href} component={Link} href={link.href} sx={{ '&.Mui-selected': { color: '#60a5fa' } }}>
						<ListItemText
							primary={link.label}
							primaryTypographyProps={{
								color: pathname === link.href ? '#60a5fa' : '#d1d5db', // text-blue-400 or gray-300
								fontWeight: pathname === link.href ? 'bold' : 'normal',
							}}
						/>
					</ListItemButton>
				))}
			</List>
		</Box>
	)

	return (
		<>
			<AppBar position="sticky" sx={{ bgcolor: '#111827', color: '#f3f4f6', zIndex: 1100 }}>
				<Toolbar sx={{ maxWidth: '7xl', mx: 'auto', width: '100%', px: 2, display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#60a5fa' }}>
						Lead Manager
					</Typography>

					{isMobile ? (
						<IconButton edge="end" color="inherit" onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
					) : (
						<Box sx={{ display: 'flex', gap: 4 }}>
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`hover:text-blue-400 transition ${pathname === link.href ? 'text-blue-400 font-semibold' : 'text-gray-300'
										}`}
								>
									{link.label}
								</Link>
							))}
						</Box>
					)}
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
				{drawerContent}
			</Drawer>
		</>
	)
}
