import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import theme from '../../../config/theme'
import { rhythm } from '../../lib/typography'
import { bpMaxSM } from '../../lib/breakpoints'
import axios from 'axios'

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM

const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  name: Yup.string(),
})

const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      Thanks! {/* Double opt in */}
      Please check your inbox to confirm your subscription!
      {/* Single opt in
      You've been added to the list. */}
    </div>
  )
}

class SignUp extends React.Component {
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
    // const successful = response && response.status === 'success'

    return (
      <div>
        {!submitted && (
          <div>
            <h2
              css={css`
                margin-bottom: ${rhythm(1)};
                margin-top: 0;
              `}
            >
              Get hand-crafted updates about web development.
            </h2>
            <p>No spam and you can unsubscribe at any time.</p>
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
            render={({ errors, touched }) => (
              <Form
                css={css`
                  display: flex;
                  align-items: flex-end;
                  label:not(:first-of-type),
                  button {
                    margin-left: 10px;
                  }
                  .field-error {
                    display: block;
                    //position: absolute;
                    color: ${theme.colors.red};
                    font-size: 80%;
                  }
                  input,
                  label {
                    width: 100%;
                  }
                  ${bpMaxSM} {
                    flex-direction: column;
                    align-items: flex-start;
                    width: auto;
                    label,
                    input {
                      margin: 5px 0 0 0 !important;
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                    }
                    button {
                      margin: 20px 0 0 0;
                    }
                  }
                `}
              >
                <label htmlFor="name">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
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
                  />
                </label>
                <label htmlFor="email">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
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
                  />
                </label>
                <button data-element="submit" type="submit">
                  {!loading && 'Submit'}
                  {loading && 'Submitting...'}
                </button>
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

export default SignUp
