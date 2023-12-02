import { Command } from 'cmdk'
import React, { useState } from 'react'
import { RaycastLightIcon } from '../icon'
import { SubCommand } from '../subCommand'
import Application from '../items/application'

const CommandMenu = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState('')
  React.useEffect(() => {
    inputRef.current?.focus()
  })


  const onValueChange = (v: string) => {
    setValue(v)
  }

  return (
    <Command className='raycast' label="Global Command Menu">
      <div cmdk-raycast-top-shine="" />
      <Command.Input value={value} onValueChange={onValueChange} autoFocus ref={inputRef} />
      <hr cmdk-raycast-loader="" />
      <Command.List ref={listRef}>
        <Command.Empty>No results found.</Command.Empty>

        <Application />

        <Command.Item>Apple</Command.Item>
      </Command.List>

      <div cmdk-raycast-footer="">
        <RaycastLightIcon />

        <button cmdk-raycast-open-trigger="">
          Open Application
          <kbd>↵</kbd>
        </button>

        <hr />

        <SubCommand listRef={listRef} selectedValue={value} inputRef={inputRef} />
      </div>
    </Command>
  )
}

export default function Self() {
  return (
    <>
      <CommandMenu />
    </>
  )
}
