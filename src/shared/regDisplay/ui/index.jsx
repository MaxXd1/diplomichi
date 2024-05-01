import React from 'react'

export const RegDisplay = () => {
  return (
    <><div className={style.left_column}>
          <Input
              type="First Name"
              value={firstName}
              placeholder="First Name"
              setValue={setFirstName} />
          <Input
              type="Second Name"
              value={secondName}
              placeholder="Second Name"
              setValue={setSecondName} />
          <Input
              type="Email"
              value={email}
              placeholder="Email"
              setValue={setEmail}
              setValid={setEmailValid}
              isValidation />
          {!emailValid && (
              <div className={style.validate}>Не верный email</div>
          )}
          <Input
              type="Company Name"
              value={companyName}
              placeholder="Company Name"
              setValue={setCompanyName} />
      </div><div className={style.right_column}>
              <RoleSelect />
              <CountrySelect />
              <Input
                  type="Password"
                  value={password}
                  placeholder="Password"
                  setValue={setPassword}
                  setValid={setPasswordValid}
                  isValidation />
              {!passwordValid && (
                  <div className={style.validate}>Пароль не подходит</div>
              )}
              <Input
                  type="RepeatPassword"
                  value={repeatPassword}
                  placeholder="RepeatPassword"
                  setValue={setRepeatPassword} />
              {password === repeatPassword ? (
                  ""
              ) : (
                  <div className={style.validate}>Пароль не совпадает</div>
              )}
          </div></>
  )
}
