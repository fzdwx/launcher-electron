import {Application, getApplications} from "@/native"
import {Command} from "launcher-api"
import React, {useEffect, useState} from "react"
import {addAppRunCount, getIcon} from "@/native";

const useApplications = () => {
    const [loading, setLoading] = useState(true)
    const [apps, setApps] = useState<Application[]>([])

    useEffect(() => {
        setLoading(true)
        getApplications().then((apps) => {
            setApps(apps.sort((a, b) => {
                return b.count - a.count
            }))
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
      <img alt="icon" className="w-4" src={image} />
    </>)
  }
  return (
    <></>
  )
}


const application = () => {
    const {apps, loading} = useApplications()
    const runApplication = (app: Application) => {
        const command = app.exec.replace("%u", "").replace("%U", "")
        window.launcher.execCommand(command)
        window.launcher.hide()
        addAppRunCount(app)
    }

    return (
        <>
            <Command.Group heading="Applications">
                {apps.map((item) => (
                    <Command.Item
                        key={item.name}
                        value={item.name}
                        data-value={item.count}
                        onSelect={() => {
                            runApplication(item)
                        }}
                    >
                        <AppImage app={item}/>
                        {item.name}
                    </Command.Item>
                ))}
            </Command.Group>
        </>
    )
}

export default application
