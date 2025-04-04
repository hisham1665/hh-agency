import React from 'react'
import myimage from '../assets/1.jpg'
function Catogory_Card() {
    return (
        <div className='w-48 h-60 m-12'>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src={myimage} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">brushes</h5>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Catogory_Card