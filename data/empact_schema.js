const typeDefinitions = `

# The base EMPACT Platform Entity type.
interface EPEntity {
  guid: ID!
  name: String!
  version: String!
  versionLabel: String
  shortDescription: String
  description: String!
}

# Defining a URL type
String Url

# Enums for Environment Descriptor Types
enum EPEnvironmentDescriptorType {
  MIN
  MAX
}

# Enums for Scenario Option Data Types
enum EPScenarioOptionDataType {
  TOGGLE
}

# Enums for the types of play states that the platform could be in
enum EPPlayState {
  PLAYING
  PAUSING
  STOPPING
  RESETTING
  NOT_RUNNING
}

type EPEnvironment implements EPEntity {
  guid: ID!
  name: String!
  version: String!
  versionLabel: String
  shortDescription: String
  description: String!
  pictureUrl: Url
  thumbnailUrl: Url
  descriptors: [Descriptor!]
}

type EPEnvironmentDescriptor {
  name: String 
  type: EPEnvironmentDescriptorType
  value: Int
}

type EPScenario implements EPEntity {
  guid: ID!
  name: String!
  version: String!
  versionLabel: String
  shortDescription: String
  description: String!
  iconUrl: Url
  threatType: [String!]!
  requiredEnvironmentDescriptors: [EPEnvironmentDescriptor!]
  scenarioOptions: [EPScenarioOption!]
  scenarioMicroLearnings: [EPScenarioMicroLearning!]
}

type EPScenarioOption {
  name: String!
  title: String!
  description: String!
  dataType: EPScenarioOptionDataType!
}

type EPScenarioMicroLearning {
  name: String!
  title: String!
  description: String!
}

type EPPlatform implements EPEntity {
  guid: ID!
  name: String!
  version: String!
  versionLabel: String
  shortDescription: String
  description: String!
  environments: [EPEnvironment!]
  scenarios: [EPScenario!]
}

type EPPlatformPlayState {
  platform: EPPlatform!
  playState: EPPlayState!
}

type Query {
  platform(guide: ID, name: String, version: String)
  environment(guid: ID, name: String, version: String)
  scenario(guid: ID, name: String, version: String, environmentGuid: ID)
}

schema {
  query: Query
}

`;

export default [typeDefinitions];
