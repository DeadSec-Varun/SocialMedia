import { Queue } from 'bullmq';

const pushQueue = new Queue('pushQueue');
const pullQueue = new Queue('pullQueue');
const notificationQueue = new Queue('notificationQueue');

export async function pushPostsToQueue(postData) {
    try {
        const job = await pushQueue.add('createFeed', postData);
        console.log(`Post job added to queue with ID: ${job.id}`);
        return job.id;
    } catch (error) {
        console.error('Error adding post to queue:', error);
        throw error;
    }
}

export async function pullPostsToQueue(pullData) {
    try {
        const job = await pullQueue.add('createFeed', pullData);
        console.log(`Pull job added to queue with ID: ${job.id}`);
        return job.id;
    } catch (error) {
        console.error('Error adding post to queue:', error);
        throw error;
    }
}

export async function addNotificationToQueue(notificationData) {
    try {
        const job = await notificationQueue.add('sendNotification', notificationData);
        console.log(`Notification job added to queue with ID: ${job.id}`);
        return job.id;
    } catch (error) {
        console.error('Error adding notification to queue:', error);
        throw error;
    }
}


