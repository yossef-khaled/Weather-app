import { DUMMY_DATA } from "./dummy-data"

type MockFetcherResponse = {
    isLoading: boolean; 
    data: typeof DUMMY_DATA[0] | null; 
    error: {message: string} | null
}

export type AxisDimensions = {
    width: number;
    height?: number;
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
}

export const fetcher = async (url: string) => {
    if(!url) return;
    const res = await fetch(url).then(res => res.json())
    return res;
}

export const getAttrFromNestedObj = (object: any, path: string | string[], defaultValue?: any) => {
    if (!Object.keys(object).length) return defaultValue;
  
    const pathArray = Array.isArray(path) ? path : path.split('.');
  
    let result = object;
  
    for (let i = 0; i < pathArray.length; i++) {
      const value = pathArray[i];
  
      if (typeof result === 'object' && result !== null && value in result) {
        result = result[value];
      } else {
        return defaultValue;
      }
    }
  
    return result;
}

/**
 * 
 * @param localDateTime Local date time in YYYY-mm-dd hh:mm format. 
 * @returns Time in `hmm` format.
 */
export const extractTimeFromLocalDateTime = (localDateTime: string) => {
    const time = localDateTime.split(' ')[1];
    
    const timeInHmm = time.replace(':', '');
    return timeInHmm;
}

export const formatAPITime = (time: string) => {
    if(time.length <= 2) time = time.concat('00')
    return time.slice(0, time.length - 2) + ':' + time.slice(time.length - 2, time.length)
}

export const combineChartDimensions = (dimensions: AxisDimensions) => {
    const parsedDimensions = {
        ...dimensions,
        marginTop: dimensions.marginTop || 0,
        marginRight: dimensions.marginRight || 0,
        marginBottom: dimensions.marginBottom || 0,
        marginLeft: dimensions.marginLeft || 0,
    }

    return {
        ...parsedDimensions,
        boundedHeight: parsedDimensions.height ? Math.max(parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0) : 0,
        boundedWidth: Math.max(+parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
    }
}

// export const mockFetcher = async (url: string | null, isSuccessful: boolean = false, resTime: number = 1000) => {
//     let res: MockFetcherResponse = {
//         isLoading: true,
//         error: null,
//         data: null
//     }
//     if(!url) return res;
//     setTimeout(() => {
//         if(isSuccessful) {
//             res = {
//                 ...res,
//                 isLoading: false,
//                 data: DUMMY_DATA.find((DATA) => url.includes(DATA.url)) as typeof DUMMY_DATA[0]
//             }
//         }
//         else {
//             res = {
//                 ...res,
//                 isLoading: false,
//                 error: {
//                     message: 'Failed to get data'
//                 }
//             }
//         }
//         return res;
//     }, resTime)
// }