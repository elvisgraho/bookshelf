export function updateDataToString(reqBody: any): string {
  // converts req body data to string for db queries
  if (!reqBody || typeof reqBody != 'object') {
    throw `Bad (updateDataToString) data! ${JSON.stringify(reqBody)}`;
  }

  const isbn = reqBody.isbn ? reqBody.isbn : '';
  const name = reqBody.name ? reqBody.name : '';
  const authors = reqBody.authors ? reqBody.authors : '';
  const annotation = reqBody.annotation ? reqBody.annotation : '';

  let updateString: string = '';

  if (typeof isbn == 'string' && isbn.length > 0) {
    updateString = `isbn = '${isbn}',`;
  }
  if (typeof name == 'string' && name.length > 0) {
    updateString = `${updateString} name = '${name}',`;
  }
  if (typeof authors == 'string' && authors.length > 0) {
    updateString = `${updateString} authors = '${authors}',`;
  }
  if (typeof annotation == 'string' && annotation.length > 0) {
    updateString = `${updateString} annotation = '${annotation}',`;
  }
  // remove last comma
  if (updateString.length > 0) {
    updateString = updateString.substring(0, updateString.length - 1);
  } else {
    throw `Bad data! ${JSON.stringify(reqBody)}`;
  }

  return updateString;
}
