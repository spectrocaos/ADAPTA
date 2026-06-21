import { useState, useMemo } from 'react'
import { X, Send, Search, CheckCircle2, FileText, Brain, BookOpen, Zap, Eye } from 'lucide-react'
import { useLibrary } from '../../hooks/useLibrary'
import './SelectMaterialModal.css'

const CONDITIONS = [
  { id: 'tea', label: 'TEA', icon: Brain, color: 'var(--color-tea)', bg: 'var(--color-tea-light)' },
  { id: 'dyslexia', label: 'Dislexia', icon: BookOpen, color: 'var(--color-dyslexia)', bg: 'var(--color-dyslexia-light)' },
  { id: 'adhd', label: 'TDAH', icon: Zap, color: 'var(--color-adhd)', bg: 'var(--color-adhd-light)' },
  { id: 'color_blind', label: 'Daltonismo', icon: Eye, color: 'var(--color-color-blind)', bg: 'var(--color-color-blind-light)' },
]

export default function SelectMaterialModal({ isOpen, onClose, student, onShare }) {
  const { materials } = useLibrary()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedMaterialId, setSelectedMaterialId] = useState(null)

  // Filtra por termo de busca, caso o professor queira achar algo específico
  const filteredMaterials = useMemo(() => {
    // Para simplificar, a busca será apenas no conteúdo adaptado ou data (no MVP não temos título)
    return materials.filter(m => 
      m.adapted.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [materials, searchTerm])

  if (!isOpen) return null

  const handleShare = async (e, materialId) => {
    e.preventDefault()
    setLoading(true)
    setSelectedMaterialId(materialId)
    
    if (onShare) onShare(materialId)

    // Simula disparo de notificação / envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)
    
    // Auto-fecha após 2.5s
    setTimeout(() => {
      setSuccess(false)
      setSelectedMaterialId(null)
      setSearchTerm('')
      onClose()
    }, 2500)
  }

  return (
    <div className="select-material-modal-overlay animate-fade-in">
      <div className="select-material-modal-card glass-card animate-fade-scale">
        <button className="select-material-modal-close" onClick={onClose} disabled={loading || success}>
          <X size={20} />
        </button>
        
        {success ? (
          <div className="select-material-modal-success animate-fade-in">
            <CheckCircle2 size={48} color="var(--color-primary)" />
            <h3>Material Enviado!</h3>
            <p>O material foi compartilhado com o aluno <strong>{student?.name}</strong> com sucesso.</p>
          </div>
        ) : (
          <>
            <h2 className="select-material-modal-title">Selecionar Material</h2>
            <p className="select-material-modal-subtitle">
              Escolha um material da sua biblioteca para enviar para <strong>{student?.name}</strong>.
            </p>
            
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar materiais..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="materials-list">
              {filteredMaterials.length === 0 ? (
                <div className="materials-empty">Nenhum material encontrado.</div>
              ) : (
                filteredMaterials.map(material => {
                  const cond = CONDITIONS.find(c => c.id === material.condition)
                  const isSendingThis = loading && selectedMaterialId === material.id
                  return (
                    <div key={material.id} className="material-list-item">
                      <div className="material-item-info">
                        <div className="material-item-header">
                          <span className="material-badge" style={{ color: cond?.color, background: cond?.bg }}>
                            {cond && <cond.icon size={12} />} {cond?.label}
                          </span>
                          <span className="material-date">
                            {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="material-preview">
                          {material.adapted.substring(0, 80).replace(/[#*`]/g, '')}...
                        </p>
                      </div>
                      <button 
                        className="btn-primary btn-send-material"
                        onClick={(e) => handleShare(e, material.id)}
                        disabled={loading}
                      >
                        {isSendingThis ? <span className="spinner" /> : <><Send size={14} /> Enviar</>}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
