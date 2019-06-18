import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import tw from 'tailwind.macro'
import { css } from '@emotion/core'
import { withTheme } from '../Theming'
import colors from '../../lib/colors'
import fonts from '../../lib/typography'
import { bpMinSM, bpMinMD } from '../../lib/breakpoints'
import Hand from '../Hand'
import Button from '../Button'

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM

const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  name: Yup.string(),
})

const PostSubmissionMessage = ({ response }) => (
  <div
    css={css({
      textAlign: 'center',
    })}
  >
    Thanks! {/* Double opt in */}
    Please check your inbox to confirm your subscription!
    {/* Single opt in
      You've been added to the list. */}
  </div>
)

class SubscribeForm extends React.Component {
  state = {
    submitted: false,
  }

  async handleSubmit(values) {
    const url = `https://api.convertkit.com//v3/forms/${FORM_ID}/subscribe`
    this.setState({ submitted: true, loading: true })

    axios
      .post(url, { ...values, api_key: process.env.CONVERTKIT_PUBLIC_KEY })
      .then(
        ({ data }) => {
          this.setState({
            submitted: true,
            loading: false,
            response: data,
            errorMessage: null,
          })
        },
        err => {
          this.setState({
            submitted: false,
            loading: false,
            errorMessage: 'Something went wrong!',
          })
        },
      )
  }

  render() {
    const { submitted, loading, response, errorMessage } = this.state
    const { theme, ...props } = this.props
    return (
      <div {...props}>
        {!submitted && (
          <div
            css={css(
              tw`flex flex-col-reverse items-center sm:flex-row sm:items-start`,
            )}
          >
            <div css={css(tw`flex-grow mt-8`)}>
              <h2
                css={css({
                  margin: '0 0 20px 0',
                  fontFamily: fonts.semibold,
                })}
              >
                Get emails from me about coding, business, learning, and
                teaching.
              </h2>
              <p css={css(tw`text-base m-0`)}>
                There will be no spam and you can unsubscribe at any time. I
                send different content than what is posted here. Over 4000
                people enjoy it, and you probably will too!
              </p>
            </div>
            <div
              css={css({
                flexShrink: 0,
                margin: 0,
                [bpMinSM]: {
                  width: '80px',
                  margin: '0 0 0 80px',
                },
                [bpMinMD]: {
                  width: '100px',
                  margin: '0 0 0 120px',
                },
              })}
            >
              <Hand
                baseColor={theme.colors.bodyColor}
                altColor={theme.colors.bodyBg}
                primaryColor={theme.colors.primary}
              />
            </div>
          </div>
        )}

        {!submitted && (
          <Formik
            initialValues={{
              email: '',
              name: '',
            }}
            validationSchema={SubscribeSchema}
            onSubmit={values => this.handleSubmit(values)}
            render={({ errors }) => (
              <Form
                css={css(
                  {
                    '.field-error': {
                      color: theme.colors.red,
                    },
                  },
                  tw`flex flex-col sm:flex-row items-end mt-5`,
                )}
              >
                <label htmlFor="name" css={labelStyles}>
                  <div css={labelInnerStyles}>
                    First Name
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="field-error"
                    />
                  </div>
                  <Field
                    aria-label="your first name"
                    aria-required="false"
                    name="name"
                    placeholder="Jane"
                    type="text"
                    css={inputFieldStyles}
                  />
                </label>
                <label htmlFor="email" css={labelStyles}>
                  <div css={labelInnerStyles}>
                    Email
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="field-error"
                    />
                  </div>
                  <Field
                    aria-label="your email address"
                    aria-required="true"
                    name="email"
                    placeholder="jane@acme.com"
                    type="email"
                    css={inputFieldStyles}
                  />
                </label>
                <Button
                  data-element="submit"
                  type="submit"
                  css={css({
                    height: '50px',
                    borderRadius: '3px',
                    fontSize: '16px',
                    padding: '10px 13px',
                  })}
                >
                  {!loading && 'Subscribe'}
                  {loading && 'Subscribing...'}
                </Button>
              </Form>
            )}
          />
        )}
        {submitted && !loading && <PostSubmissionMessage response={response} />}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}

export default withTheme(SubscribeForm)

const labelStyles = css({
  width: '100%',
  fontSize: '16px',
  fontWeight: 400,
  margin: '0 0 20px 0',
  [bpMinSM]: {
    margin: '0 20px 0 0',
  },
})

const labelInnerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  fontSize: '16px',
})

const inputFieldStyles = css({
  display: 'block',
  width: '100%',
  fontSize: '16px',
  height: '50px',
  borderRadius: '3px',
  borderColor: colors.gray,
  boxShadow: 'none',
  fontWeight: 400,
  '::placeholder': {
    color: '#bbbbbb',
    opacity: 1,
    transition: '150ms',
  },
  ':focus': {
    '::placeholder': {
      opacity: 0,
    },
  },
})
