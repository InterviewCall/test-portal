import { PutObjectCommand } from '@aws-sdk/client-s3';
import chromium from '@sparticuz/chromium-min';
import axios, { AxiosResponse } from 'axios';
import puppeteer from 'puppeteer-core';

import { s3 } from '@/configs/awsConfig';
import { CANDIDATE_API } from '@/constants';
import { CandidateResponse, CandidateResult } from '@/types';
import { pdfContent } from '@/utils';

async function submitService(candidateResult: CandidateResult) {
    try {
        const { candidateEmail, percentage } = candidateResult;

        const isLocal = !!process.env.EXECUTABLE_PATH;
        const browser = await puppeteer.launch({
            args: isLocal ? puppeteer.defaultArgs() : chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: process.env.EXECUTABLE_PATH || await chromium.executablePath(),
            headless: chromium.headless,
        });
    
        const page = await browser.newPage();
    
        const pageContent = pdfContent(candidateResult);
    
        await page.setContent(pageContent, {
            waitUntil: 'networkidle0'
        });
    
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
              top: '20px',
              bottom: '20px',
              left: '20px',
              right: '20px',
            },
        });
    
        await browser.close();
    
        const bucketName = process.env.AWS_S3_BUCKET_NAME!;
        const safeEmail = candidateEmail.replace(/[^a-zA-Z0-9]/g, '_');
        const fileKey = `uploads/Report_${safeEmail}`;
    
        const uploadParams = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: pdf,
            ContentType: 'application/pdf',
            ACL: 'public-read'
        });
    
        await s3.send(uploadParams);
        const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    
        const candidateDetails: AxiosResponse<CandidateResponse> = await axios.patch(`${CANDIDATE_API}/update-candidate`, {
            email: candidateEmail,
            reportCard: fileUrl,
            percentage
        });

        return candidateDetails.data.data;
    } catch (error) {
        throw error;
    }
}

export default submitService;