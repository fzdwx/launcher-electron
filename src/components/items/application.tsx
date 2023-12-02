import { Application, getApplications } from "@/native"
import { Command } from "cmdk"
import React, { useEffect, useState } from "react"

const useApplications = () => {
  const [loading, setLoading] = useState(true)
  const [apps, setApps] = useState<Application[]>([])


  useEffect(() => {
    setLoading(true)
    getApplications().then((apps) => {
      setApps(apps)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return {
    apps,
    loading
  }
}


const application = () => {
  const { apps, loading } = useApplications()
  return (
    <>
      {loading && <Command.Loading>Fetching words…</Command.Loading>}
      <Command.Group heading="Applications">
        {apps.map((item) => (
          <Command.Item
            key={item.name}
            value={item.name}
          >
            {item.name}
          </Command.Item>
        ))}
      </Command.Group>
    </>
  )
}

export default application
