import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dfxuoyflo',
    api_key: '184227514676455',
    api_secret: 'hsYfApvqmg1EpFs2CbvYH8tnwyU',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('Debe de subir el archivo correctamente a Cloudinary', async() => {

        const imageUrl = 'https://i0.wp.com/dennis7dees.com/wp-content/uploads/2021/09/Simple-Small-landscape-idea.jpg?resize=1080%2C720&ssl=1';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // console.log(url);

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources(['journal-app/' + imageId],
            { resource_type: 'image' }
        );
        // console.log({ cloudResp });
      
    });

    test('Debe de retorna null', async() => {
      
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);

    });
  
});
