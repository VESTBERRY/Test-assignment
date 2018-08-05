/* eslint-disable camelcase */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLError,
} from 'graphql'
import casual from 'casual'

// const asyncDelay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

const SectorType = new GraphQLObjectType({
  name: 'Sector',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: s => s.id,
    },
    name: {
      type: GraphQLString,
      resolve: s => s.name,
    },
    color: {
      type: GraphQLString,
      resolve: s => s.color
    },
    companies: {
      type: GraphQLList(CompanyType),
      resolve: s => companies.filter(company => company.sector.id === s.id)
    }
  })
})

// @todo split formatters from base type
const StageType = new GraphQLObjectType({
  name: 'Stage',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: s => s.id,
    },
    name: {
      type: GraphQLString,
      resolve: s => s.name,
    },
    color: {
      type: GraphQLString,
      resolve: s => s.color
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve: s => companies.filter(company => company.stage.id === s.id)
    },
  })
})

const companyFields = {
  id: {
    type: GraphQLString,
    resolve: c => c.id,
  },
  name: {
    type: GraphQLString,
    resolve: c => c.name,
    // resolve: async (c) => {
    //   await asyncDelay(4000)
    //   return c.name
    // }
  },
  stage: {
    type: StageType,
    resolve: c => c.stage,
  },
  stage_id: {
    type: GraphQLString,
    resolve: c => c.stage.id
  },
  stage_name: {
    type: GraphQLString,
    resolve: c => c.stage.name
  },
  sector: {
    type: SectorType,
    resolve: c => c.sector,
  },
  sector_id: {
    type: GraphQLString,
    resolve: c => c.sector.id,
  },
  sector_name: {
    type: GraphQLString,
    resolve: c => c.sector.name,
  },
  investmentSize: {
    type: GraphQLInt,
    resolve: c => c.investmentSize,
  },
  formatInvestmentSize: {
    type: GraphQLString,
    resolve: c => `${c.investmentSize} EUR`
  },
  color: {
    type: GraphQLString,
    resolve: c => c.color,
  }
}

const DisplayableColumnsForCompaniesTable = new GraphQLObjectType({
  name: 'DisplayableColumnsForCompaniesTable',
  description: '...',
  fields: () => {
    const {id, sector, color, stage, stage_id, sector_id, investmentSize, ...whitelist} = companyFields

    return whitelist
  }
})
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '...',
  fields: () => companyFields,
})

const sectorList = ['Fintech', 'IOT', 'Roboadvisory', 'Insuretech']
const sectors = sectorList.map(sectorListItem => ({
  id: casual.random,
  name: sectorListItem,
  color: casual.rgb_hex,
}))

const stageList = ['Idea', 'Prototype', 'Seed', 'Series A', 'Series B', 'Series C']
const stages = stageList.map(stageListItem => ({
  id: casual.random,
  name: stageListItem,
  color: casual.rgb_hex,
}))

const companies = [...Array(Math.round(Math.random() * 3 + 4)).keys()]
  .map(() => ({
    id: casual.random,
    name: casual.company_name,
    stage: casual.random_element(stages),
    sector: casual.random_element(sectors),
    investmentSize: Math.round(Math.random() * 10000000),
    color: casual.rgb_hex,
  }))

const companyQuery = {
  type: GraphQLList(CompanyType),
  resolve: (root, args, {session, ...data}, d) =>
    companies
}

const sectorQuery = {
  type: GraphQLList(SectorType),
  resolve: (root, args, {session, ...data}, d) =>
    sectors
}

const stageQuery = {
  type: GraphQLList(StageType),
  resolve: (root, args, {session, ...data}, d) =>
    stages
}

const query = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: {
    company: companyQuery,
    sector: sectorQuery,
    stage: stageQuery,
  }
})

const addCompany = (_, input, context) => {
  const errors = []

  if (companies.find(c => c.name === input.name)) {
    errors.push({
      key: 'name',
      message: 'Company with such name already exists'
    })
  }

  if (input.name.length <= 2) {
    errors.push({
      key: 'name',
      message: 'Company name has to be longer then 2 characters'
    })
  }
  if (!stages.find(s => s.name === input.stage)) {
    errors.push({
      key: 'stage',
      message: 'Company stage must be in the list'
    })
  }
  if (!sectors.find(s => s.name === input.sector)) {
    errors.push({
      key: 'sector',
      message: 'Company sector must be in the list'
    })
  }
  if (input.investmentSize < 0) {
    errors.push({
      key: 'investmentSize',
      message: 'Investment size has to be positive number'
    })
  }

  if (errors.length > 0) {
    throw new ValidationError(errors)
  }

  const company = {
    ...input,
    id: casual.random,
    color: casual.rgb_hex,
    sector: sectors.find(s => s.name === input.sector),
    stage: stages.find(s => s.name === input.stage),
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
  types: [CompanyType, SectorType, StageType, DisplayableColumnsForCompaniesTable],
  query,
  mutation,
})

export default schema
