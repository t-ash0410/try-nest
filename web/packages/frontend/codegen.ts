import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/schema.gql',
  documents: 'app/**/!(*.d).{ts,tsx}',
  generates: {
    './app/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './app/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
