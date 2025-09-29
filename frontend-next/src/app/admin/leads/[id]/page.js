'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '../../../components/AdminLayout'

export default function LeadDetailPage() {
  const params = useParams()
  const [lead, setLead] = useState(null)

  useEffect(() => {
    const fetchLeads = async () => {
      const user = localStorage.getItem('adminUser')
      const pass = localStorage.getItem('adminPass')

      // Se não estiver autenticado, redireciona para login
      if (!user || !pass) {
        router.push('/admin/login')
        return
      }

      // Cria header de Basic Auth
      const authHeader = 'Basic ' + btoa(`${user}:${pass}`)

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${params.id}`, {
          headers: { Authorization: authHeader }
        })

        if (!res.ok) throw new Error('Erro ao buscar leads')

        const data = await res.json()
        setLead(data)
      } catch (err) {
        console.error(err.message)
        router.push('/admin/login')
      }
    }

    fetchLeads()
  }, [params.id])

  if (!lead) return <p className="text-gray-200">Carregando...</p>

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Detalhes do Lead</h1>
      <div className="space-y-3 text-gray-200 bg-gray-900 p-6 rounded-2xl shadow-md">
        <p><strong>Nome:</strong> {lead.nome}</p>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Telefone:</strong> {lead.telefone}</p>
        <p><strong>Cargo:</strong> {lead.cargo}</p>
        <p><strong>Data de Nascimento:</strong> {' '}
          {lead.data_nascimento
            ? new Date(lead.data_nascimento).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : '-'
          }
        </p>
        <p><strong>Mensagem:</strong> {lead.mensagem}</p>
        <p><strong>UTM Source:</strong> {lead.utm_source}</p>
      </div>
    </AdminLayout>
  )
}
