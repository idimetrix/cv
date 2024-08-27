import { combineProviders } from 'react-combine-providers'

const provider = combineProviders()

for (const contentProvider of []) {
   provider.push(contentProvider)
}

// Master provider is used to provide the context to all components
export default provider.master()
