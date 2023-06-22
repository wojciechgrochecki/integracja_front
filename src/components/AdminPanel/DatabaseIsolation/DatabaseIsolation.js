import style from './styles.module.css'
import axios from 'axios'
import { useAuth } from '../../../hooks/auth'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react'

export default function SeedDatabase() {

    const [textAreaContentFirst, setTextAreaContentFirst] = useState('');
    const [gotDataFirst, setGotDataFirst] = useState(0);
    const [textAreaContentSecond, setTextAreaContentSecond] = useState('');
    const [gotDataSecond, setGotDataSecond] = useState(0);


    const { token } = useAuth();


    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    function readCommited() {
        let url = "http://localhost:8080/api/Database/ReadCommitedTest";

        fetch(url, config)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw Error('Error' + response.status + ': ' + response.statusText);
                }
            })
            .then((response) => {
                if (response.success) {
                    setGotDataFirst(1);
                    setTextAreaContentFirst(JSON.stringify(response.message).replace(/\*/g, '\n\n'));
                    console.log(response.message);
                }
                else {
                    setGotDataFirst(1);
                    setTextAreaContentFirst(JSON.stringify(response.message));
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });

    }

    function readUncommited() {
        let url = "http://localhost:8080/api/Database/ReadUncommitedTest";

        fetch(url, config).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw Error('Error' + response.status + ': ' + response.statusText);
            }
        })
            .then((response) => {
                if (response.success) {
                    setGotDataSecond(1);
                    setTextAreaContentSecond(JSON.stringify(response.message).replace(/\*/g, '\n\n'));
                    console.log(response.message);
                }
                else {
                    setGotDataSecond(1);
                    setTextAreaContentSecond(JSON.stringify(response.message));
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });

    }



    return (<div className={style["two-column-grid"]}>
        <div className={style["left-column"]}>
            <button onClick={readCommited}>Read Commited</button>
            {gotDataFirst !== 0 &&
                <textarea rows={5}
                    value={textAreaContentFirst}
                    readOnly
                />
            }
        </div>
        <div className={style["right-column"]}>
            <button onClick={readUncommited}>Read Uncommited</button>
            {gotDataSecond !== 0 &&
                <textarea rows={5}
                    value={textAreaContentSecond}
                    readOnly
                />
            }
        </div>

    </div>
    )
}

