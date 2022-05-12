package com.vax.warden.encryption;

import static java.time.format.DateTimeFormatter.ISO_DATE;

import java.security.Key;
import java.time.LocalDate;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class LocalDateEncryptor implements AttributeConverter<LocalDate, String> {

    private static final String AES = "AES";
    private static final String BITS_128 = "5FA2B642FC82CE05B3540AEED61FAC7E";
    private static final byte[] ENCRYPTION_KEY = BITS_128.getBytes();

    private final Cipher encryptCipher;
    private final Cipher decryptCipher;

    public LocalDateEncryptor() throws Exception {
        Key key = new SecretKeySpec(ENCRYPTION_KEY, AES);
        encryptCipher = Cipher.getInstance(AES);
        encryptCipher.init(Cipher.ENCRYPT_MODE, key);
        decryptCipher = Cipher.getInstance(AES);
        decryptCipher.init(Cipher.DECRYPT_MODE, key);
    }

    @Override
    public String convertToDatabaseColumn(LocalDate attribute) {
        try {
            return Base64.getEncoder()
                    .encodeToString(encryptCipher.doFinal(attribute.format(ISO_DATE).getBytes()));
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public LocalDate convertToEntityAttribute(String dbData) {
        try {
            return LocalDate.parse(
                    new String(decryptCipher.doFinal(Base64.getDecoder().decode(dbData))),
                    ISO_DATE);
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
