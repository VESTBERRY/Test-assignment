import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLError,
  // GraphQLFloat,
  // GraphQLScalarType,
} from 'graphql'
import casual from 'casual'

class ValidationError extends GraphQLError {
  constructor (errors) {
    super(`The request is invalid. Number of errors: ${errors.length}`)
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message)
      } else {
        // result[error.key] = [error.message]
        result[error.key] = error.message
      }
      return result
    }, {})
  }
}

// const FormInputText = new GraphQLScalarType({
//   name: 'text',
//   serialize: () => {},
//   parseValue: () => {},
//   parseLiteral: () => {},
// })

// const FormInputNumber = new GraphQLScalarType({
//   name: 'number',
//   serialize: () => {},
//   parseValue: () => {},
//   parseLiteral: () => {},
// })

// const FormInputSelect = new GraphQLScalarType({
//   name: 'select',
//   serialize: () => {},
//   parseValue: () => {},
//   parseLiteral: () => {},
// })

// const CompanyTypeForm = new GraphQLObjectType({
//   name: 'CompanyTypeForm',
//   description: '...',
//   fields: () => ({
//     name: {
//       type: FormInputText,
//       resolve: () => {}
//     },
//     stage: {
//       type: FormInputSelect,
//       resolve: () => {}
//     },
//     sector: {
//       type: FormInputSelect,
//       resolve: () => {}
//     },
//     investmentSize: {
//       type: FormInputNumber,
//       resolve: () => {}
//     }
//   })
// })

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '...',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve: company => company.id,
      },
      name: {
        type: GraphQLString,
        resolve: company => company.name,
      },
      stage: {
        type: GraphQLString,
        resolve: company => company.stage,
      },
      sector: {
        type: GraphQLString,
        resolve: company => company.sector,
      },
      investmentSize: {
        type: GraphQLInt,
        resolve: company => company.investmentSize,
      },
      color: {
        type: GraphQLString,
        resolve: company => company.color,
      }
      // forDonut: {
      //   type: GraphQLFloat,
      //   resolve: ({...all}) => {
      //     console.log('all')
      //     return 0.1
      //   }
      // }
    }
  }
})

const sectors = ['Fintech', 'IOT', 'Roboadvisory', 'Insuretech', 'With Space']
const stages = ['Idea', 'Prototype', 'Seed', 'Series A', 'Series B', 'Series C']
const companies = [...Array(Math.round(Math.random() * 3 + 4)).keys()]
  .map(() => ({
    id: casual.random,
    name: casual.company_name,
    stage: casual.random_element(stages),
    sector: casual.random_element(sectors),
    investmentSize: Math.round(Math.random() * 10000000),
    color: casual.rgb_hex
  }))

const companyQuery = {
  type: GraphQLList(CompanyType),
  resolve: (root, args, {session, ...data}, d) =>
    companies
}

const sectorQuery = {
  type: GraphQLList(GraphQLString),
  resolve: (root, args, {session, ...data}, d) =>
    sectors
}

const stageQuery = {
  type: GraphQLList(GraphQLString),
  resolve: (root, args, {session, ...data}, d) =>
    stages
}

const query = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: {
    company: companyQuery,
    sector: sectorQuery,
    stage: stageQuery
  }
})

const addCompany = (_, input, context) => {
  const errors = []

  if (input.name.length <= 2) {
    errors.push({
      key: 'name',
      message: 'Company name has to be longer then 2 characters'
    })
    // errors.push(new GraphQLError('Company name has to be longer then 2 characters'))
    // throw new GraphQLError('Company name has to be longer then 2 characters')
  }
  if (stages.indexOf(input.stage) === -1) {
    errors.push({
      key: 'stage',
      message: 'Company stage must be in the list'
    })
    // errors.push(new GraphQLError('Company stage must be in the list'))
    // throw new GraphQLError('Company stage must be in the list')
  }
  if (sectors.indexOf(input.sector) === -1) {
    errors.push({
      key: 'sector',
      message: 'Company sector must be in the list'
    })
    // errors.push(new GraphQLError('Company sector must be in the list'))
    // throw new GraphQLError('Company sector must be in the list')
  }
  if (input.investmentSize < 0) {
    errors.push({
      key: 'investmentSize',
      message: 'Investment size has to be positive number'
    })
    // errors.push(new GraphQLError('Investment size has to be positive number'))
    // throw new GraphQLError('Investment size has to be positive number')
  }

  if (errors.length > 0) {
    throw new ValidationError(errors)
  }

  const company = {
    id: casual.random,
    color: casual.rgb_hex,
    ...input
  }

  companies.push(company)

  return company
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: '...',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: {
          type: GraphQLString,
          name: 'name',
        },
        stage: {
          type: GraphQLString,
          name: 'stage',
        },
        sector: {
          type: GraphQLString,
          name: 'sector',
        },
        investmentSize: {
          type: GraphQLInt,
          name: 'investmentSize',
        },
      },
      resolve: addCompany,
    }
  },
})

const schema = new GraphQLSchema({
  query,
  mutation,
})

export default schema
