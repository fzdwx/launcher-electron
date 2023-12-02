import { Command } from 'cmdk'
import React from 'react'

const CommandMenu = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    inputRef.current?.focus()
  })

  return (
    <div>
      {/* <Command.Dialog className='raycast' open label="Global Command Menu">
        <Command.Input autoFocus ref={inputRef} />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Letters">
            <Command.Item>a</Command.Item>
            <Command.Item>b</Command.Item>
            <Command.Separator />
            <Command.Item>c</Command.Item>
          </Command.Group>

          <Command.Item>Apple</Command.Item>
        </Command.List>
      </Command.Dialog> */}

      <div onClick={() => {
        console.log(window.launcher.execCommand("date",));

      }}>
        12313
      </div>
    </div>

  )
}

export default function Self() {
  return (
    <>
      <CommandMenu />
    </>
  )
}