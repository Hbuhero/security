import React, { createContext, useContext, useState } from 'react'

type SelectionState = {
    selectedRegion?: { id?: number; name?: string } | null
    selectedMCU?: { id?: number; name?: string } | null
    selectedAMCOS?: { id?: number; name?: string } | null
    setSelectedRegion: (r: { id?: number; name?: string } | null) => void
    setSelectedMCU: (m: { id?: number; name?: string } | null) => void
    setSelectedAMCOS: (a: { id?: number; name?: string } | null) => void
}

const SelectionContext = createContext<SelectionState | undefined>(undefined)

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedRegion, setSelectedRegion] = useState<{ id?: number; name?: string } | null>(null)
    const [selectedMCU, setSelectedMCU] = useState<{ id?: number; name?: string } | null>(null)
    const [selectedAMCOS, setSelectedAMCOS] = useState<{ id?: number; name?: string } | null>(null)

    return (
        <SelectionContext.Provider
            value={{ selectedRegion, selectedMCU, selectedAMCOS, setSelectedRegion, setSelectedMCU, setSelectedAMCOS }}
        >
            {children}
        </SelectionContext.Provider>
    )
}

export const useSelection = () => {
    const ctx = useContext(SelectionContext)
    if (!ctx) throw new Error('useSelection must be used within SelectionProvider')
    return ctx
}
