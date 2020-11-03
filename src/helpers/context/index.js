import React, { createContext, useEffect, useState } from 'react'

export const appContext = createContext({
  layout: {
    drawerIsOpen: false,
    toogleDrawer: () => { },
    closeDrawer: () => { },
    topbarIsVisible: true,
    setTopbar: () => { },
    appLoading: true
  },
  auth: { user: null, setAuthUser: () => { } }
})

const AppContextProvider = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [appLoading, setAppLoading] = useState(true)
  const [topbarIsVisible, setTopbarIsVisible] = useState(true)
  const [user, setUser] = useState()

  const toogleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen)
  }
  const closeDrawer = () => {
    setDrawerIsOpen(false)
  }

  const setAuthUser = (user, { persist } = {}) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)

    if (!persist) {
      window.addEventListener('beforeunload', (e) => {
        localStorage.removeItem('user')
      })
    }
  }
  const setTopbar = (state = true) => {
    setTopbarIsVisible(state)
  }

  useEffect(() => {
    setAppLoading(false)
  })

  return (
    <appContext.Provider value={{
      layout: {
        drawerIsOpen,
        toogleDrawer,
        closeDrawer,
        topbarIsVisible,
        setTopbar,
        appLoading
      },
      auth: { user, setAuthUser }
    }}>
      {props.children}
    </appContext.Provider>
  )
}
export default AppContextProvider
