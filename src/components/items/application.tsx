import { Application, getApplications } from "@/native"
import { Command } from "cmdk"
import React, { useEffect, useState } from "react"
import { app } from 'electron';
import { getIcon } from "@/native/desktop";

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

const AppImage = ({ app }: { app: Application }) => {
  const image = getIcon(app)
  if (image) {
    return (<>
      <img className="w-4" src={image} />
    </>)
  }
  return (
    <></>
  )
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
            <AppImage app={item} />
            {item.name}
          </Command.Item>
        ))}
      </Command.Group>
    </>
  )
}

export default application
