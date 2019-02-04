import requests
import urllib


def download_path(file_name='Cover Letter'):
    return '/Users/nikhilsulegaon/Downloads/' + file_name + '.pdf'


def call_api(url, params, allow_redirects=True):
    response = requests.get(url, params, allow_redirects=allow_redirects)
    return response.json()


def generate_cover_letter(delete_copy=True):
    cover_letter_url = 'https://script.google.com/macros/s/AKfycbx5h-ZDEY7CZiJJuFGIIyQHfUXggBfMQ0Ms-h5OcEeY-CyaJTs/exec'
    position = input('Position: ')
    company = input('Company: ')

    params = {'position': position,
              'company': company}

    print('Generating Cover letter from template...')
    json_response = call_api(cover_letter_url, params)
    download_url = json_response['downloadUrl']
    file_id_to_delete = json_response['fileCopyId']

    print('Letter Generated! Downloading Letter: ', json_response)
    download_cover_letter(download_url, download_path(company))
    if delete_copy:
        delete_cover_letter_copy(file_id_to_delete)


def download_cover_letter(download_url, path):
    urllib.request.urlretrieve(download_url, path)
    print('Download successful: ', path)


def delete_cover_letter_copy(file_id_to_delete):
    delete_url = 'https://script.google.com/macros/s/AKfycbzXOgqj6a1WxijVwhrPm7uV5coMsZSmaBQPFPVzPO9-SK-LJOz-/exec'
    params = {'fileId': file_id_to_delete}
    json_response = call_api(delete_url, params)

    print('Deleting copy on Google Drive...')
    print(json_response)


if __name__ == '__main__':
    generate_cover_letter()
