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
      const start = params.position;
      //   const end = document.
      const text = document.getText();

      //   const highlight: DocumentHighlight = {
      //     range: range,
      //     type: DocumentHighlightKind.Text,
      //   };
      //   return [highlight];
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
