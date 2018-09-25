import * as moment from 'moment';

export default function formatTimestamp(timestamp) {
    return {
        dateTime: moment.unix(timestamp).format("MMM Do, YYYY"), // 'Aug 8, 2018',
        timeago: moment.unix(timestamp).fromNow() //'2 day ago'
    }
}
