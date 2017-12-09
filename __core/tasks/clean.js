'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');

const chalk = require('chalk');
const copy = require('copy');
const del = require('del');

function deleteDir(profile, includeOutput) {
    let deletedFiles = del.sync([
        path.resolve(`./${profile}/**/*`)
    ]);
    deletedFiles.forEach(df => {
        console.log(chalk`{blue [deleted] ${df}}`);
    });
    if (includeOutput) {
        deletedFiles = del.sync([
            path.resolve(`./__core/outputs/${profile}/**/*`)
        ]);
        deletedFiles.forEach(df => {
            console.log(chalk`{blue [deleted] ${df}}`);
        });
    }
}

function copyTemplate(profile) {
    copy(
        path.resolve(`./__core/templates/${profile}/**/*`),
        path.resolve(`./${profile}`),
        (err, files) => {
            if (err) {
                console.log(chalk`{red ${err}}`)
            }
        }
    );
}

function clean(profile) {
    switch (profile) {
        case 'js-browser':
        case 'js-node':
            deleteDir(profile, false);
            copyTemplate(profile);
            break;
        case 'ts-browser':
        case 'ts-node':
            deleteDir(profile, true);
            copyTemplate(profile);
            break;
        default:
            console.log(chalk`{red Unrecognized profile '${profile}'}`);
            break;
    }
}

function cleanAll(profiles) {
    profiles.forEach(profile => clean(profile));
}

let cleanProfiles = process.argv.slice(2);
if (cleanProfiles.length === 0) {
    cleanProfiles = ['js-browser', 'js-node', 'ts-node'];
}
cleanAll(cleanProfiles);

