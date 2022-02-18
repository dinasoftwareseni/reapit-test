import { ReapitConnectSession } from '@reapit/connect-session'
import { UpdatePropertyModel } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS, BASE_UPDATE_HEADERS } from '../constants/api'

export const propertiesUpdateApiService = async (
  session: ReapitConnectSession | null,
): Promise<UpdatePropertyModel | undefined> => {
  try {
    if (!session) return

    const response = await fetch(`${window.reapit.config.platformApiUrl}${URLS.UPDATE_PROPERTIES_TYPES}`, {
      method: 'PATCH',
      headers: {
        ...BASE_UPDATE_HEADERS,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (response.ok) {
      const responseJson: Promise<UpdatePropertyModel | undefined> = response.json()
      return responseJson
    }

    throw new Error('No response returned by API')
  } catch (err) {
    const error = err as Error
    console.error('Error fetching Properties Types', error.message)
  }
}
