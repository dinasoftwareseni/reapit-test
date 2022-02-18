import { ReapitConnectSession } from '@reapit/connect-session'
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'

export const propertiesApiService = async (
  session: ReapitConnectSession | null,
): Promise<PropertyModelPagedResult | undefined> => {
  try {
    if (!session) return

    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.PROPERTIES_TYPES}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (response.ok) {
      const responseJson: Promise<PropertyModelPagedResult | undefined> = response.json()
      return responseJson
    }

    throw new Error('No response returned by API')
  } catch (err) {
    const error = err as Error
    console.error('Error fetching Properties Types', error.message)
  }
}
