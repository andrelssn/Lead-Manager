const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- POST: criar lead (público) ---
export async function createLead(payload) {
  const res = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erro ao criar lead');
  }

  return res.json();
}

// --- GET: listar leads (protegido, via backend proxy) ---
export async function getLeads(authHeader) {
  const res = await fetch(`${API_URL}/leads`, {
    headers: { Authorization: authHeader }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erro ao buscar leads');
  }

  return res.json();
}

// --- GET: lead por ID (protegido) ---
export async function getLeadById(id, authHeader) {
  const res = await fetch(`${API_URL}/leads/${id}`, {
    headers: { Authorization: authHeader }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Lead não encontrado');
  }

  return res.json();
}

// --- PUT: atualizar lead (protegido) ---
export async function updateLead(id, payload, authHeader) {
  const res = await fetch(`${API_URL}/leads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erro ao atualizar lead');
  }

  return res.json();
}

// --- DELETE: remover lead (protegido) ---
export async function deleteLead(id, authHeader) {
  const res = await fetch(`${API_URL}/leads/${id}`, {
    method: 'DELETE',
    headers: { Authorization: authHeader }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erro ao deletar lead');
  }

  return res.json();
}
