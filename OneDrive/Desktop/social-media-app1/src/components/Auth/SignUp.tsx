import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import style from './SignUp.module.css'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Modal from '@mui/material/Modal'
import { BsXLg } from 'react-icons/bs'
import { v4 as uuid4 } from 'uuid'

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [day, setDay] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    modalOpen()
  }, [])

  const modalOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const getPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const getMonth = (event: SelectChangeEvent<string>) => {
    setMonth(event.target.value)
  }

  const getYear = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value)
  }

  const getDay = (event: SelectChangeEvent<string>) => {
    const selectedMonth = Number(month)
    const selectedDay = Number(event.target.value)

    let maxDays = 31
    if (selectedMonth === 2) {
      maxDays = 28
    } else if ([4, 6, 9, 11].includes(selectedMonth)) {
      maxDays = 30
    }

    if (selectedDay >= 1 && selectedDay <= maxDays) {
      setDay(event.target.value)
    } else {
      setDay('')
    }
  }

  const getUserData = (e: React.FormEvent) => {
    e.preventDefault()
    const nameRegex = /^[A-Za-z\s-]{2,}$/
    const phoneRegex = /^[\d\s-]{7,15}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nameRegex.test(name)) {
      // Handle invalid name input
      return
    } else if (!phoneRegex.test(phone)) {
      // Handle invalid phone input
      return
    } else if (!emailRegex.test(email)) {
      // Handle invalid email input
      return
    } else if (month === '' || day === '' || year === '') {
      // Handle missing date of birth
      return
    } else {
      const dateOfBirth = { year, month, day }

      // Retrieve existing user data from local storage
      const storedUserData = localStorage.getItem('userData')
      let userData = []

      if (storedUserData) {
        userData = JSON.parse(storedUserData)
      }

      // Add new user data to the array
      userData.push({ id: uuid4(), name, phone, email, dob: dateOfBirth })

      // Store the updated user data back in local storage
      localStorage.setItem('userData', JSON.stringify(userData))
      setName('')
      setPhone('')
      setEmail('')
      setDob('')
      setMonth('')
      setYear('')
      setDay('')
      navigate('/')
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="registration-modal-title"
      aria-describedby="registration-modal-description"
    >
      <div className={style.Container}>
        <span>
          <BsXLg className={style.crossIcon} onClick={handleClose} />
          <span className={style.wrapperCrossIcon}>
            Fill Each Block Correctly Then Only You Can Able To Sign-In Properly
          </span>
        </span>
        <form action="" className={style.wrapper}>
          <h2 className={style.heading}>Create your account</h2>

          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className={style.Name}
            value={name}
            onChange={getName}
            size="medium"
            sx={{ width: '25rem' }}
          />

          <br />

          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            className={style.Email}
            value={phone}
            onChange={getPhone}
            size="medium"
            sx={{ width: '25rem' }}
          />

          <br />

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={style.Phone}
            value={email}
            onChange={getEmail}
            sx={{ width: '25rem' }}
          />

          <br />
          <h6 className={style.headingDob}>Date of Birth</h6>
          <div className={style.text}>
            This will not be shown publicly. Confirm your own age, even if this account is
            for a business, a pet, or something else.
          </div>

          <div className={style.container}>
            <FormControl>
              <InputLabel>Month</InputLabel>
              <Select value={month} onChange={getMonth} style={{ minWidth: '200px' }}>
                {Array.from(Array(12), (_, i) => i + 1).map((month) => (
                  <MenuItem key={month} value={month} sx={{ width: '5rem' }}>
                    {new Date(0, month - 1).toLocaleString('default', {
                      month: 'long',
                    })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Day</InputLabel>
              <Select value={day} onChange={getDay} style={{ minWidth: '80px' }}>
                {Array.from(Array(31), (_, i) => i + 1).map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Year</InputLabel>
              <Select value={year} onChange={getYear} style={{ minWidth: '80px' }}>
                {Array.from(Array(121), (_, i) => 2023 - i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button
            className={`${style.nextBtn} ${
              !name || !phone || !email || !month || !day || !year ? '' : style.enabled
            }`}
            onClick={getUserData}
            disabled={!name || !phone || !email || !month || !day || !year}
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default SignUp
