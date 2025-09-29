'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
    e.preventDefault()

    const TEST_USER = 'admin'
    const TEST_PASS = 'admin'

    if (form.email === "admin@teste.com" && form.password === TEST_PASS) {
      // Salva no localStorage
      localStorage.setItem('adminUser', TEST_USER)
      localStorage.setItem('adminPass', TEST_PASS)

      router.push('/admin/leads')
    } else {
      alert('Credenciais inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-8 bg-gray-800 rounded-2xl shadow-lg space-y-4">
      <input name="email" type="email" placeholder="Email" onChange={handleChange}
        className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
      <input name="password" type="password" placeholder="Senha" onChange={handleChange}
        className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">Entrar</button>

      <span>Credenciais para teste</span><br />
      <span> email: admin@teste.com | senha: admin </span>
    </form>
  )
}
