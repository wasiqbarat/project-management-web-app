import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddProjectForm({ onAddProject }) {
  const [newProject, setNewProject] = useState({
    name: '',
    team: '',
    image_url: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!newProject.name.trim() || !newProject.team.trim()) {
      setError('Project name and team ID are required')
      return
    }

    try {
      await onAddProject({
        name: newProject.name.trim(),
        team_id: newProject.team.trim(),
        image_url: newProject.image_url.trim() || null
      })
      setNewProject({ name: '', team: '', image_url: '' })
    } catch (err) {
      setError(err.message || 'Failed to create project')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          placeholder="Enter project name"
          required
        />
      </div>
      <div>
        <Label htmlFor="team">Team ID</Label>
        <Input
          id="team"
          value={newProject.team}
          onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
          placeholder="Enter team ID"
          required
        />
      </div>
      <div>
        <Label htmlFor="image_url">Image URL (Optional)</Label>
        <Input
          id="image_url"
          value={newProject.image_url}
          onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
          placeholder="Enter image URL (optional)"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setNewProject({ name: '', team: '', image_url: '' })}>
          Cancel
        </Button>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  )
}

