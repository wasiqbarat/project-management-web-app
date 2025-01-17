'use client'

import React, { useState, useEffect } from 'react'
import { fetchMyProjects, getProjectTasks, addProject } from '../lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ProjectCard } from './project-card'
import { TasksList } from './tasks-list'
import { AddProjectForm } from './add-project-form'

export function MyProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectTasks, setProjectTasks] = useState([])
  const [tasksLoading, setTasksLoading] = useState(false)
  const [tasksError, setTasksError] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchMyProjects()
      setProjects(data)
    } catch (err) {
      setError('Failed to load projects')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewTasks = async (project) => {
    setSelectedProject(project)
    setTasksLoading(true)
    setTasksError('')
    setProjectTasks([])

    try {
      const tasks = await getProjectTasks(project.id)
      setProjectTasks(tasks)
    } catch (err) {
      console.error('Error loading tasks:', err)
      setTasksError(err.message || 'Failed to load tasks')
    } finally {
      setTasksLoading(false)
    }
  }

  const handleAddProject = async (projectData) => {
    try {
      await addProject(projectData)
      await loadProjects()
    } catch (err) {
      console.error('Error adding project:', err)
      throw err
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace.
              </DialogDescription>
            </DialogHeader>
            <AddProjectForm onAddProject={handleAddProject} />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading projects...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewTasks={() => handleViewTasks(project)}
            />
          ))}
        </div>
      )}

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name} - Tasks</DialogTitle>
          </DialogHeader>
          <TasksList
            tasks={projectTasks}
            loading={tasksLoading}
            error={tasksError}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

