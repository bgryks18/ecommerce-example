import { useGetSession } from '@/api/user'
import Page from '@/components/Layout/Page'
import { Button, FormControl, TextField, Typography } from '@mui/material'
import { FormGroup } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useSetAtom } from 'jotai'
import { errorState } from '@/store/ui'

interface IFormInput {
  email: string
  password: string
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: 400,
    maxWidth: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  formGroup: {
    display: 'flex',
    gap: 12,
  },
  sendButton: {
    textTransform: 'none',
    gap: 6,
  },
}))
const Login = () => {
  const { mutateAsync: mutateGetSession, isLoading } = useGetSession()
  const setError = useSetAtom(errorState)
  const classes = useStyles()
  const { register, handleSubmit } = useForm<IFormInput>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await mutateGetSession()
      navigate('/')
    } catch (e: any) {
      console.log('login error', e)
      setError(
        e?.response?.data && typeof e?.response?.data === 'string'
          ? e?.response?.data
          : e?.message
      )
    }
  }

  return (
    <Page showSidebar={false}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <Typography component="div" variant="h6" color="GrayText">
          Login
        </Typography>
        <FormGroup>
          <FormControl className={classes.formGroup}>
            <TextField
              label="E-mail"
              defaultValue="test@hotmail.com"
              disabled
              {...register('email')}
            />
            <TextField
              type="password"
              label="Password"
              defaultValue="123456"
              disabled
              {...register('password')}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={isLoading}
              className={classes.sendButton}
            >
              {isLoading && <CircularProgress size={18} color="secondary" />}
              <span>Login</span>
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Page>
  )
}

export default Login
