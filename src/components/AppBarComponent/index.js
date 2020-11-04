import { AppBar, IconButton, makeStyles, MenuItem, Toolbar, Typography, Menu, Button, Avatar } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { AccountCircle } from '@material-ui/icons'
import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../helpers/context'
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  type: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButton: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: red[400]
  }
}))

export default function AppBarComponent ({
  title = '',
  withoutDrawer = false
}) {
  const router = useHistory()
  const classes = useStyles()
  const { auth } = useContext(appContext)
  const anchorEl = useRef()
  const [showUserDropdow, setShowUserDropdow] = useState(false)

  const handleLogoutButton = () => {
    setShowUserDropdow(false)
    auth.logoutUser()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {!withoutDrawer && (
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {auth.user
          ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={() => setShowUserDropdow(true)}
                color="inherit"
                ref={anchorEl}
              >
                <Avatar src={auth.user.avatar} />
              </IconButton>
              <Menu
                id="customized-menu"
                styles={{ width: 400, heigth: 300 }}
                anchorEl={anchorEl.current}
                open={showUserDropdow}
                onClose={() => setShowUserDropdow(false)}
                keepMounted
              >
              <div className={classes.type}>
                <Avatar src={auth.user.avatar} />
                <Typography variant="h6"> {auth.user.name} </Typography>
                <Typography variant="subtitle2"> {auth.user.ac} </Typography>
              </div>
                <MenuItem className={classes.logoutButton} onClick={handleLogoutButton}>Sair</MenuItem>
              </Menu>
            </div>
            )
          : (
            <Button color="inherit" onClick={() => router.push('/auth/login')}>Entrar</Button>
            )}
      </Toolbar>
    </AppBar>
  )
}
