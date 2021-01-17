/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CancellationToken,
  createConnection,
  DocumentHighlight,
  DocumentHighlightParams,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
  TextDocuments,
} from 'vscode-languageserver/node';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);
// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(
  (_params: InitializeParams): InitializeResult => ({
    capabilities: {
      documentHighlightProvider: true,
      hoverProvider: true,
    },
  })
);

connection.onDocumentHighlight(
  (
    params: DocumentHighlightParams,
    token: CancellationToken
  ): DocumentHighlight[] | null => {
    const document = documents.get(params.textDocument.uri);
    if (document) {
      // offset from beginning of document to where cursor is
      const offset = document.offsetAt(params.position);
      // entired document's text
      const text = document.getText();
      console.log(offset);
      // call algorithm and get returned object
      // if possible, get ending index to highlight on client side
    }
    return [];
  }
);

connection.onHover(() => {
  return null;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
