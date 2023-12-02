import { Command } from 'cmdk'
import React from 'react'

const CommandMenu = () => {

  return (
    <Command.Dialog open label="Global Command Menu">
      <Command.Input />
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
    </Command.Dialog>
  )
}

export default function Self() {
  return (
    <>
      <div>
        <CommandMenu />
      </div>
    </>
  )
}
