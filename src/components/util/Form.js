class Errors {
  /**
  * Create a new Errors instance.
  */
  constructor () {
    this.errors = []
  }

  /**
  * Determine if an errors exists for the given field.
  *
  * @param {string} field
  */
  has (field) {
    return !!this.errors.find(elem => elem.campo === field)
  }

  /**
  * Determine if we have any errors.
  */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
  * Retrieve the error message for a field.
  *
  * @param {string} field
  */
  get (field) {
    const resultado = this.errors.find(elem => elem.campo === field)

    if (resultado !== undefined) {
      return this.errors.find(elem => elem.campo === field)['mensajeError']
    }
  }

  /**
  * Record the new errors.
  *
  * @param {object} errors
  */
  record (errors) {
    this.errors = errors
  }

  /**
  * Clear one or all error fields.
  *
  * @param {string|null} field
  */
  clear (field) {
    if (field) {
      this.errors = this.errors.filter(elem => elem.campo !== field)
      return
    }
    else {
      this.errors = []
    }
  }
}

class Form {
  /**
  * Create a new Form instance.
  *
  * @param {object} data
  */
  constructor (data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  /**
  * Fetch all relevant data for the form.
  */
  data () {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

  /**
  * Reset the form fields.
  */
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }

    this.errors.clear()
  }

  /**
  * Send a POST request to the given URL.
  * .
  * @param {string} url
  */
  post (url) {
    return this.submit('post', url)
  }

  /**
  * Send a PUT request to the given URL.
  * .
  * @param {string} url
  */
  put (url) {
    return this.submit('put', url)
  }

  /**
  * Send a PATCH request to the given URL.
  * .
  * @param {string} url
  */
  patch (url) {
    return this.submit('patch', url)
  }

  /**
  * Send a DELETE request to the given URL.
  * .
  * @param {string} url
  */
  delete (url) {
    return this.submit('delete', url)
  }

  /**
  * Submit the form.
  *
  * @param {string} requestType
  * @param {string} url
  */
  submit (requestType, url) {
    /*  return new Promise((resolve, reject) => {
        axios[requestType](url, this.data())
            .then(response => {
                this.onSuccess(response.data)

                resolve(response.data)
            })
            .catch(error => {
                this.onFail(error.response.data)

                reject(error.response.data)
            })
          }) */
  }

  /**
  * Handle a successful form submission.
  *
  * @param {object} data
  */
  onSuccess (data) {
    console.log(data.message) // temporary

    this.reset()
  }

  /**
  * Handle a failed form submission.
  *
  * @param {object} errors
  */
  onFail (errors) {
    this.errors.record(errors)
  }
}

export default Form
