package com.vax.warden.encryption;

import java.security.Key;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class DateEncryptor implements AttributeConverter<Date, String> {

    private static final String AES = "AES";
    private static final String BITS_128 = "5FA2B642FC82CE05B3540AEED61FAC7E";
    private static final byte[] ENCRYPTION_KEY = BITS_128.getBytes();
    public static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    private final Cipher encryptCipher;
    private final Cipher decryptCipher;

    public DateEncryptor() throws Exception {
        Key key = new SecretKeySpec(ENCRYPTION_KEY, AES);
        encryptCipher = Cipher.getInstance(AES);
        encryptCipher.init(Cipher.ENCRYPT_MODE, key);
        decryptCipher = Cipher.getInstance(AES);
        decryptCipher.init(Cipher.DECRYPT_MODE, key);
    }

    @Override
    public String convertToDatabaseColumn(Date attribute) {
        try {
            return Base64.getEncoder()
                    .encodeToString(encryptCipher.doFinal(formatter.format(attribute).getBytes()));
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public Date convertToEntityAttribute(String dbData) {
        try {
            return formatter.parse(
                    new String(decryptCipher.doFinal(Base64.getDecoder().decode(dbData))));
        } catch (IllegalBlockSizeException | BadPaddingException | ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
