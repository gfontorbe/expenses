import fs from 'fs';
import { CompositeGeneratorNode, NL, processGeneratorNode } from 'langium';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import path from 'path';

export function generateJavaScript(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    model.expenses.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.amount}!');`, NL));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, processGeneratorNode(fileNode));

    model.expenses.forEach(x => console.log(x.amount));

    return generatedFilePath;
}

