import { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

export default function SprintCapacityCalculator() {
  const [sprintStart, setSprintStart] = useState('2026-06-15');
  const [sprintEnd, setSprintEnd] = useState('2026-06-26');
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Membro 1', vacationDays: 0, absenceDays: 0 },
    { id: 2, name: 'Membro 2', vacationDays: 0, absenceDays: 0 }
  ]);
  const [holidays, setHolidays] = useState([
    '2026-06-20', // Corpus Christi
    '2026-09-07', // Independência
    '2026-10-12', // Nossa Senhora Aparecida
  ]);
  const [newHoliday, setNewHoliday] = useState('');

  const brasilianHolidays2026 = {
    '2026-01-01': 'Ano Novo',
    '2026-02-16': 'Segunda de Carnaval',
    '2026-02-17': 'Terça de Carnaval',
    '2026-02-18': 'Quarta de Cinzas',
    '2026-04-21': 'Tiradentes',
    '2026-05-01': 'Dia do Trabalho',
    '2026-06-04': 'Corpus Christi',
    '2026-09-07': 'Independência',
    '2026-10-12': 'Nossa Senhora Aparecida',
    '2026-11-02': 'Finados',
    '2026-11-15': 'Proclamação da República',
    '2026-11-20': 'Consciência Negra',
    '2026-12-25': 'Natal',
  };

  const countWorkDays = () => {
    const start = new Date(sprintStart);
    const end = new Date(sprintEnd);
    let workDays = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split('T')[0];
      
      // Pula fins de semana
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      // Pula feriados
      if (holidays.includes(dateStr)) continue;
      
      workDays++;
    }
    return workDays;
  };

  const calculateCapacity = () => {
    const workDays = countWorkDays();
    const totalHours = workDays * hoursPerDay;
    const vacationHours = teamMembers.reduce((sum, m) => sum + (m.vacationDays * hoursPerDay), 0);
    const absenceHours = teamMembers.reduce((sum, m) => sum + (m.absenceDays * hoursPerDay), 0);
    const realCapacity = totalHours * teamMembers.length - vacationHours - absenceHours;
    
    return {
      workDays,
      totalHours,
      vacationHours,
      absenceHours,
      realCapacity: Math.max(0, realCapacity)
    };
  };

  const capacity = calculateCapacity();

  const updateMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const addMember = () => {
    const newId = Math.max(...teamMembers.map(m => m.id), 0) + 1;
    setTeamMembers([...teamMembers, { id: newId, name: `Membro ${newId}`, vacationDays: 0, absenceDays: 0 }]);
  };

  const removeMember = (id) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    }
  };

  const addHoliday = () => {
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays([...holidays, newHoliday]);
      setNewHoliday('');
    }
  };

  const removeHoliday = (date) => {
    setHolidays(holidays.filter(h => h !== date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-blue-400" />
          Capacidade de Sprint
        </h1>
        <p className="text-slate-400 mb-8">Calcule a capacidade real do seu time considerando férias e feriados</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INPUTS */}
          <div className="space-y-6">
            {/* Sprint Dates */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Sprint</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-300 block mb-1">Início</label>
                  <input 
                    type="date" 
                    value={sprintStart}
                    onChange={(e) => setSprintStart(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 block mb-1">Fim</label>
                  <input 
                    type="date" 
                    value={sprintEnd}
                    onChange={(e) => setSprintEnd(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 block mb-1">Horas por dia</label>
                  <input 
                    type="number" 
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Feriados */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Feriados 🇧🇷</h2>
              <div className="space-y-3">
                {holidays.map(date => (
                  <div key={date} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                    <span className="text-sm text-slate-200">
                      {new Date(date).toLocaleDateString('pt-BR')} 
                      {brasilianHolidays2026[date] && ` - ${brasilianHolidays2026[date]}`}
                    </span>
                    <button
                      onClick={() => removeHoliday(date)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input 
                  type="date" 
                  value={newHoliday}
                  onChange={(e) => setNewHoliday(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 text-sm"
                />
                <button
                  onClick={addHoliday}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* OUTPUT + TEAM */}
          <div className="space-y-6">
            {/* Capacidade */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-lg p-6 border border-emerald-700">
              <h2 className="text-lg font-semibold text-white mb-4">Capacidade Real</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Dias úteis no sprint:</span>
                  <span className="text-2xl font-bold text-emerald-300">{capacity.workDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Horas totais disponíveis:</span>
                  <span className="text-xl font-bold text-emerald-300">{capacity.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Horas em férias:</span>
                  <span className="text-xl font-bold text-red-400">-{capacity.vacationHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Ausências/Day Off:</span>
                  <span className="text-xl font-bold text-orange-400">-{capacity.absenceHours}h</span>
                </div>
                <div className="border-t border-emerald-700 pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Capacidade Real:</span>
                  <span className="text-3xl font-bold text-emerald-200">{capacity.realCapacity}h</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Por pessoa:</span>
                  <span className="text-slate-300 font-semibold">{teamMembers.length > 0 ? (capacity.realCapacity / teamMembers.length).toFixed(1) : 0}h</span>
                </div>
              </div>
            </div>

            {/* Time Members */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Time</h2>
                <button
                  onClick={addMember}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex gap-2 items-end bg-slate-700 p-3 rounded">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 block mb-1">Nome</label>
                      <input 
                        type="text" 
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-600 text-white rounded border border-slate-500 text-sm"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-slate-400 block mb-1">Férias (dias)</label>
                      <input 
                        type="number" 
                        value={member.vacationDays}
                        onChange={(e) => updateMember(member.id, 'vacationDays', Number(e.target.value))}
                        min="0"
                        className="w-full px-2 py-1 bg-slate-600 text-white rounded border border-slate-500 text-sm"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-slate-400 block mb-1">Ausência (dias)</label>
                      <input 
                        type="number" 
                        value={member.absenceDays}
                        onChange={(e) => updateMember(member.id, 'absenceDays', Number(e.target.value))}
                        min="0"
                        className="w-full px-2 py-1 bg-slate-600 text-white rounded border border-slate-500 text-sm"
                      />
                    </div>
                    {teamMembers.length > 1 && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="px-2 py-1 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-3">📊 Resumo</h3>
          <p className="text-slate-300 text-sm">
            O seu time de <span className="font-bold text-blue-400">{teamMembers.length} pessoa{teamMembers.length > 1 ? 's' : ''}</span> tem 
            uma capacidade de <span className="font-bold text-emerald-400">{capacity.realCapacity} horas</span> 
            para este sprint ({capacity.workDays} dias úteis × {hoursPerDay}h/dia - {capacity.vacationHours}h férias - {capacity.absenceHours}h ausências).
          </p>
        </div>
      </div>
    </div>
  );
}