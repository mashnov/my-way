import { Providers } from '@/helpers/enum/auth'
import type { User } from 'firebase/auth'

type Input = User | null
type Output = Providers | null

export const providerTransformer = (userData: Input): Output => {
  const providerData = userData?.providerData || []
  const providers = providerData.map(({ providerId }) => providerId)
  if (providers.includes(Providers.EMAIL)) {
    return Providers.EMAIL
  } else if (providers.includes(Providers.GOOGLE)) {
    return Providers.GOOGLE
  } else {
    return null
  }
}
