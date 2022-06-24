import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

/**
 *
 * @param date is the "Date" object to be converted.
 * @returns formatted date string as follows: "25/01/2002 13:57"
 */
export function convertTimestamp(timestamp?: Timestamp): string {
    if (!timestamp) return '-';
    return moment(timestamp.seconds * 1000).format('DD/MM/YYYY HH:mm');
}
