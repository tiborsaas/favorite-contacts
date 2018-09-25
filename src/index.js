import callHistory from './callHistory.json';
import styles from './scss/main.scss';
import * as moment from 'moment';

// document.getElementById('content').innerText = JSON.stringify(callHistory);

class ContactsWidget {
    constructor(contacts, timeHelper) {
        this.moment = timeHelper();
        this.root = document.querySelector('section');
        this.render(contacts);
    }

    render(contacts) {
        this.root.innerHTML = '';
        contacts.forEach(contact => {
            const dateObj = this.formatTimestamp(contact.called);
            this.root.innerHTML += this.getRowHTML(contact, dateObj);
        });
        this.addRowEvents();
    }

    sortContacts(contacts) {
        return contacts;
    }

    addRowEvents() {
        const contacts = this.root.querySelectorAll('article');
        contacts.forEach(row => {
            row.addEventListener('click', function() {
                // I needed "this" to refer to the row element
                this.classList.toggle('open');
            });
        });
    }

    getRowHTML(contactData, dateObj) {
        const {firstName, lastName, phoneNumber} = contactData;
        return `<article>
            <div class="row"><p>${firstName}<strong>${lastName}</strong></p><time>${dateObj.timeago}</time></div>
            <div class="details"><p>Number: ${phoneNumber} <em>last call: ${dateObj.dateTime}</em></p></div>
        </article>`;
    }

    formatTimestamp(timestamp) {
        return {
            dateTime: moment.unix(timestamp).format("MMM d, YYYY"), // 'Aug 8, 2018',
            timeago: moment.unix(timestamp).fromNow() //'2 day ago'
        }
    }
}

const app = new ContactsWidget(callHistory, moment);
