import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useClasses } from '../../hooks/useClasses'
import { useLibrary } from '../../hooks/useLibrary'
import { Users, FolderOpen, Plus, Trash2, ArrowLeft, Brain, BookOpen, Zap, Eye, Check, Share2 } from 'lucide-react'
import SelectMaterialModal from '../../components/ui/SelectMaterialModal'
import './ClassDetailPage.css'

const CONDITIONS = [
  { id: 'tea', label: 'TEA', icon: Brain, color: 'var(--color-tea)' },
  { id: 'dyslexia', label: 'Dislexia', icon: BookOpen, color: 'var(--color-dyslexia)' },
  { id: 'adhd', label: 'TDAH', icon: Zap, color: 'var(--color-adhd)' },
  { id: 'color_blind', label: 'Daltonismo', icon: Eye, color: 'var(--color-color-blind)' },
]

export default function ClassDetailPage() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const { getClassById, addStudent, removeStudent, shareMaterial, unshareMaterial, shareMaterialWithStudent, unshareMaterialWithStudent } = useClasses()
  const { materials } = useLibrary()
  
  const [activeTab, setActiveTab] = useState('students') // 'students' | 'materials'
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [isStudentShareModalOpen, setIsStudentShareModalOpen] = useState(false)
  const [isStudentMaterialsModalOpen, setIsStudentMaterialsModalOpen] = useState(false)
  const [selectedStudentForShare, setSelectedStudentForShare] = useState(null)
  const [selectedStudentForView, setSelectedStudentForView] = useState(null)
  const [studentForm, setStudentForm] = useState({ name: '', condition: 'tea' })

  const currentClass = getClassById(classId)

  if (!currentClass) {
    return (
      <div className="class-not-found">
        <h2>Turma não encontrada.</h2>
        <button className="btn-outline" onClick={() => navigate('/turmas')}>Voltar para Turmas</button>
      </div>
    )
  }

  // Obter detalhes dos materiais compartilhados cruzando com a library
  const sharedMaterialsDetails = currentClass.sharedMaterials
    .map(id => materials.find(m => m.id === id))
    .filter(Boolean)

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (!studentForm.name) return
    addStudent(classId, studentForm.name, studentForm.condition)
    setStudentForm({ name: '', condition: 'tea' })
    setIsStudentModalOpen(false)
  }

  const handleShare = (materialId) => {
    if (currentClass.sharedMaterials.includes(materialId)) {
      unshareMaterial(classId, materialId)
    } else {
      shareMaterial(classId, materialId)
    }
  }

  return (
    <div className="class-detail-page animate-fade-in">
      <div className="class-detail-header">
        <button className="btn-back-link" onClick={() => navigate('/turmas')}>
          <ArrowLeft size={16} /> Voltar para turmas
        </button>
        <h1 className="class-detail-title">{currentClass.name}</h1>
        <p className="class-detail-subtitle">{currentClass.grade}</p>
      </div>

      <div className="class-tabs">
        <button 
          className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <Users size={16} /> Alunos ({currentClass.students.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <FolderOpen size={16} /> Materiais ({currentClass.sharedMaterials.length})
        </button>
      </div>

      <div className="class-tab-content">
        {/* ── ABA: ALUNOS ── */}
        {activeTab === 'students' && (
          <div className="tab-pane animate-fade-in">
            <div className="pane-header">
              <h3>Alunos Matriculados</h3>
              <button className="btn-primary" onClick={() => setIsStudentModalOpen(true)}>
                <Plus size={16} /> Adicionar Aluno
              </button>
            </div>

            {currentClass.students.length > 0 ? (
              <div className="students-list">
                {currentClass.students.map(student => {
                  const cond = CONDITIONS.find(c => c.id === student.condition)
                  return (
                    <div key={student.id} className="student-row">
                      <div className="student-info">
                        <div className="student-avatar" style={{ background: cond?.color }}>
                          {student.name[0].toUpperCase()}
                        </div>
                        <span className="student-name">{student.name}</span>
                      </div>
                      <div className="student-meta">
                        <span className="student-badge" style={{ color: cond?.color, background: `color-mix(in srgb, ${cond?.color} 15%, white)` }}>
                          {cond && <cond.icon size={12} />} {cond?.label}
                        </span>
                        <button 
                          className="btn-icon" 
                          onClick={() => {
                            setSelectedStudentForView(student)
                            setIsStudentMaterialsModalOpen(true)
                          }}
                          title="Ver materiais do aluno"
                        >
                          <FolderOpen size={16} />
                        </button>
                        <button 
                          className="btn-icon" 
                          onClick={() => {
                            setSelectedStudentForShare(student)
                            setIsStudentShareModalOpen(true)
                          }}
                          title="Enviar material para este aluno"
                        >
                          <Share2 size={16} />
                        </button>
                        <button className="btn-icon delete" onClick={() => removeStudent(classId, student.id)} title="Remover aluno">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>Nenhum aluno adicionado ainda.</p>
              </div>
            )}
          </div>
        )}

        {/* ── ABA: MATERIAIS ── */}
        {activeTab === 'materials' && (
          <div className="tab-pane animate-fade-in">
            <div className="pane-header">
              <h3>Materiais Compartilhados</h3>
              <button className="btn-primary" onClick={() => setIsMaterialModalOpen(true)}>
                <Plus size={16} /> Compartilhar da Biblioteca
              </button>
            </div>

            {sharedMaterialsDetails.length > 0 ? (
              <div className="shared-materials-list">
                {sharedMaterialsDetails.map(material => {
                  const cond = CONDITIONS.find(c => c.id === material.condition)
                  return (
                    <div key={material.id} className="shared-row">
                      <div className="shared-info">
                        <span className="shared-badge" style={{ color: cond?.color, borderColor: cond?.color }}>
                          {cond?.label}
                        </span>
                        <span className="shared-preview">
                          {material.adapted.substring(0, 60).replace(/[#*`]/g, '')}...
                        </span>
                      </div>
                      <button className="btn-outline-small" onClick={() => unshareMaterial(classId, material.id)}>
                        Remover
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>Nenhum material compartilhado com esta turma ainda.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MODAL: Adicionar Aluno ── */}
      {isStudentModalOpen && (
        <div className="modal-overlay" onClick={() => setIsStudentModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Adicionar Aluno</h2>
            <form onSubmit={handleAddStudent} className="modal-form">
              <div className="form-group">
                <label>Nome do Aluno</label>
                <input 
                  type="text" 
                  required 
                  value={studentForm.name}
                  onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Condição (Adaptação primária)</label>
                <select 
                  value={studentForm.condition}
                  onChange={e => setStudentForm({ ...studentForm, condition: e.target.value })}
                >
                  {CONDITIONS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsStudentModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Compartilhar Material ── */}
      {isMaterialModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMaterialModalOpen(false)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Sua Biblioteca</h2>
            <p className="modal-subtitle" style={{marginBottom: 'var(--space-4)', color: 'var(--color-text-muted)'}}>
              Selecione os materiais que deseja compartilhar com a turma <b>{currentClass.name}</b>.
            </p>
            
            <div className="library-picker-list">
              {materials.length === 0 ? (
                <p style={{textAlign: 'center', padding: 'var(--space-4)'}}>Sua biblioteca está vazia.</p>
              ) : (
                materials.map(m => {
                  const isShared = currentClass.sharedMaterials.includes(m.id)
                  const cond = CONDITIONS.find(c => c.id === m.condition)
                  return (
                    <div 
                      key={m.id} 
                      className={`picker-row ${isShared ? 'selected' : ''}`}
                      onClick={() => handleShare(m.id)}
                    >
                      <div className="picker-info">
                        <span className="picker-badge" style={{ color: cond?.color }}>{cond?.label}</span>
                        <span className="picker-preview">{m.adapted.substring(0, 80).replace(/[#*`]/g, '')}...</span>
                      </div>
                      <div className={`picker-checkbox ${isShared ? 'checked' : ''}`}>
                        {isShared && <Check size={14} color="white" />}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="modal-actions" style={{marginTop: 'var(--space-6)'}}>
              <button className="btn-primary" onClick={() => setIsMaterialModalOpen(false)}>Concluir</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Compartilhar com Aluno Específico ── */}
      <SelectMaterialModal
        isOpen={isStudentShareModalOpen}
        onClose={() => {
          setIsStudentShareModalOpen(false)
          setSelectedStudentForShare(null)
        }}
        student={selectedStudentForShare}
        onShare={(materialId) => shareMaterialWithStudent(classId, selectedStudentForShare.id, materialId)}
      />

      {/* ── MODAL: Materiais do Aluno ── */}
      {isStudentMaterialsModalOpen && selectedStudentForView && (
        <div className="modal-overlay" onClick={() => setIsStudentMaterialsModalOpen(false)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Materiais de {selectedStudentForView.name}</h2>
            <p className="modal-subtitle" style={{marginBottom: 'var(--space-4)', color: 'var(--color-text-muted)'}}>
              Materiais compartilhados especificamente com este aluno.
            </p>
            
            <div className="library-picker-list">
              {!(selectedStudentForView.sharedMaterials?.length) ? (
                <p style={{textAlign: 'center', padding: 'var(--space-4)'}}>Nenhum material compartilhado com este aluno.</p>
              ) : (
                materials.filter(m => selectedStudentForView.sharedMaterials.includes(m.id)).map(m => {
                  const cond = CONDITIONS.find(c => c.id === m.condition)
                  return (
                    <div key={m.id} className="picker-row">
                      <div className="picker-info">
                        <span className="picker-badge" style={{ color: cond?.color }}>{cond?.label}</span>
                        <span className="picker-preview">{m.adapted.substring(0, 80).replace(/[#*`]/g, '')}...</span>
                      </div>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => unshareMaterialWithStudent(classId, selectedStudentForView.id, m.id)}
                        title="Remover acesso do aluno"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>

            <div className="modal-actions" style={{marginTop: 'var(--space-6)'}}>
              <button className="btn-primary" onClick={() => setIsStudentMaterialsModalOpen(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
